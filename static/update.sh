# shell cmd

echo 'start update...'
# echo $1
cd $1 # 接收传入的参数 即地址

# 拉取更新
git fetch origin

# 获取最新代码合并到本地
# git pull origin

echo 'update complete!'