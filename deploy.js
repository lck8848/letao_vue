var node_ssh, ssh, site_dir, static_dir, filename, path
node_ssh = require('node-ssh')
path = require('path')
ssh = new node_ssh()
site_dir = '/www/wwwroot/0828letao.com'  // 改为自己站点部署目录
static_dir = './dist/'					// 指定上传静态目录中的文件
ssh.connect({
  host: '47.106.36.197',
  username: 'root',  // 非root也行，需要修改sudoer配置文件
  privateKey: 'C:\\Users\\Administrator\\.ssh\\id_rsa'
}).then(function () {
  // ssh连接成功，上传本地目录static_dir中的文件到远程服务器
  uploadDist()
})

// 上传静态资源
function uploadDist () {
  console.log('静态资源上传中....')
  // 上传目录中的文件，到远程目录
  ssh.putDirectory(static_dir, site_dir, {
    recursive: true,	// 递归上传
    concurrency: 10,	// 并发数
    validate: function (itemPath) {
      console.log(itemPath)  // 打印上传的文件，方便查看
      const baseName = path.basename(itemPath)
      // 排除不上传的文件
      return baseName.substr(0, 1) !== '.' && // do not allow dot files
            baseName !== 'node_modules' // do not allow node_modules
    }
    // ^ WARNING: Not all servers support high concurrency
    // try a bunch of values and see what works on your server
  }).then(function () {
    console.log('上传成功')
    process.exit()	// 退出进程
  }, function (error) {
    console.error('错误信息：' + error.message)
  })
}
