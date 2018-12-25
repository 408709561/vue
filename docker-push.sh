#!/bin/bash

BUILD_TAG="test1001"
REGISTRY_URL="registry-internal.cn-hangzhou.aliyuncs.com"
NAME_SPACE="ace"

if [ "$2" != "" ];
    then
    BUILD_TAG="$2"
fi

# build_push_tag
push_tag()
{
  set -e
	#build
	cd $WORKSPACE
	cnpm install
	npm run build:prod

    # push ace-ui
  docker build -t ace-ui:$BUILD_TAG .
  docker tag ace-ui:$BUILD_TAG $REGISTRY_URL/$NAME_SPACE/ace-ui:$BUILD_TAG
  docker push $REGISTRY_URL/$NAME_SPACE/ace-ui:$BUILD_TAG
  docker rmi ace-ui:$BUILD_TAG
  docker rmi $REGISTRY_URL/$NAME_SPACE/ace-ui:$BUILD_TAG
  rm -rf $WORKSPACE
}

if [ "$1" = "test" ];
    then
    # 修改API地址
    sed -i "s|^const API_URL.*$|const API_URL = 'http://localhost:8765'|g" $WORKSPACE/config/prod.env.js
    # login
    REGISTRY_URL="172.172.172.201:5000"
    NAME_SPACE="ace"
    docker login --username=123 $REGISTRY_URL --password=123
    push_tag
elif [ "$1" = "prod" ];
    then
    REGISTRY_URL="registry.cn-hangzhou.aliyuncs.com"
    NAME_SPACE="duanzonglong"
    # 修改API地址
    # sed -i "s|^const API_URL.*$|const API_URL = 'API_URL'|g" $WORKSPACE/config/prod.env.js
    docker login --username=implicitfn@126.com $REGISTRY_URL --password="123456!@#"
    push_tag
else
    echo '测试环境参考命令:dpush.sh test test1001'
    echo '生产环境参考命令:dpush.sh prod prod1001'
fi
