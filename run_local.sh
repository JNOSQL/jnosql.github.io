#!/bin/bash

# Configuration - Moving everything out of the project folder
APP_NAME="jnosql_dev"
WORK_DIR="/tmp/$APP_NAME"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$WORK_DIR"

# Cleanup any previous local residue to keep the project clean
rm -rf "$PROJECT_DIR/.bundle" "$PROJECT_DIR/.local_dev" "$PROJECT_DIR/vendor"

echo "--- Checking basic dependencies ---"
if ! command -v ruby &> /dev/null; then
    echo "Error: Ruby not found. Please install Ruby first."
    exit 1
fi

# Set up Ruby user paths
USER_GEM_DIR=$(ruby -e 'print Gem.user_dir')
export PATH="$PATH:$USER_GEM_DIR/bin"

# Ensure Bundler is available
if ! command -v bundle &> /dev/null; then
    echo "Installing Bundler in user space..."
    gem install bundler --user-install --no-document
fi

echo "--- Cleaning up port 4000 ---"
if command -v lsof &> /dev/null; then
    PID=$(lsof -t -i:4000 2>/dev/null)
    [ -n "$PID" ] && kill -9 $PID
fi

echo "--- Creating compatibility patches in $WORK_DIR ---"

# 1. Patch for Ruby 3.4+ compatibility
cat <<EOF > "$WORK_DIR/patch.rb"
class Object
  def tainted?; false; end
  def taint; self; end
  def untaint; self; end
  
  alias_method :old_instance_variable_defined?, :instance_variable_defined?
  def instance_variable_defined?(name)
    old_instance_variable_defined?(name)
  rescue NameError
    false
  end

  alias_method :old_instance_variable_get, :instance_variable_get
  def instance_variable_get(name)
    old_instance_variable_get(name)
  rescue NameError
    nil
  end

  alias_method :old_instance_variable_set, :instance_variable_set
  def instance_variable_set(name, value)
    old_instance_variable_set(name, value)
  rescue NameError
    value
  end
end
EOF

# 2. Temporary Gemfile
cat <<EOF > "$WORK_DIR/Gemfile.local"
eval_gemfile "$PROJECT_DIR/Gemfile"
gem "csv"
gem "webrick"
gem "bigdecimal"
gem "base64"
gem "mutex_m"
gem "erb"
gem "logger"
gem "drb"
gem "ostruct"
EOF

# 3. Custom Jekyll config
cat <<EOF > "$WORK_DIR/custom_config.yml"
exclude:
  - Makefile
  - CNAME
  - Gemfile
  - Gemfile.lock
  - LICENSE
  - requirements.txt
  - node_modules
  - package.json
  - package-lock.json
  - webpack.config.js
  - jekyll-rtd-theme.gemspec
  - vendor
  - run_local.sh
EOF

echo "--- Setting up environment ---"
export BUNDLE_GEMFILE="$WORK_DIR/Gemfile.local"
export BUNDLE_PATH="$HOME/.gem/jnosql_bundle"
export BUNDLE_APP_CONFIG="$WORK_DIR/bundler_config"
# GEM_HOME ensures the user-installed bundler gem is found
export GEM_HOME="$USER_GEM_DIR" 
export RUBYOPT="-r$WORK_DIR/patch.rb"

echo "--- Ensuring dependencies are installed ---"
bundle install --quiet

echo "--- Starting Jekyll Server ---"
echo "Local URL: http://127.0.0.1:4000"
echo "Note: Auto-watch is disabled for Ruby 3.4 compatibility."

bundle exec jekyll server --no-watch --config "$PROJECT_DIR/_config.yml,$WORK_DIR/custom_config.yml"
