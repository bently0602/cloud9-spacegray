#!/bin/bash

set -e

cwd=$(pwd)
ace_dir="$1"

if [ "$ace_dir" == "" ]; then
    echo "cloud9-spacegray create needs a path to the ace module in cloud9 core"
    echo "ex. '/software/core/node_modules/ace'"
    exit 1
fi

if [ ! -d "$ace_dir/tool" ]; then
    echo "cloud9-spacegray create needs a path to the ace module in cloud9 core"
    echo 'error - the tool subdirectory does not exist'
    echo "ex. '/software/core/node_modules/ace'"
    exit 1
fi

if [ ! -f "$ace_dir/tool/tmtheme.js" ]; then
    echo "cloud9-spacegray create needs a path to the ace module in cloud9 core"
    echo 'error - the tool/tmtheme.js does not exist'
    echo "ex. '/software/core/node_modules/ace'"
    exit 1
fi

mkdir -p ./spacegray

cd "$ace_dir/tool"
npm install

cd "$cwd"
node "$ace_dir/tool/tmtheme.js" spacegray "./spacegray-ocean.tmTheme" "./spacegray"

echo "
.ace-spacegray .ace_print-margin {
    background: rgb(45, 55, 60);
}
" >> "./spacegray/spacegray.css"