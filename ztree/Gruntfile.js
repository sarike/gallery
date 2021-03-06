module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      all: {
        options: {
          transform: function(code) {
            return [
                'define(function(require, exports, module) {',
                "var jQuery = require('$');",
                "require('./ztree.css');",
                code,
                "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.all-3.5.js',
        name: 'ztree.js'
      },
      css: {
        options: {
          transform: function(code) {
            code = code.replace('./img/line_conn.gif', 'https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif');
            code = code.replace('./img/zTreeStandard.png', 'https://i.alipayobjects.com/e/201303/2MFzqnrx4P.png');
            code = code.replace('./img/zTreeStandard.gif', 'https://i.alipayobjects.com/e/201303/2MFzMNFUUn.gif');
            code = code.replace('./img/loading.gif', 'https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif');
            return code;
          }
        },
        url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/css/zTreeStyle/zTreeStyle.css',
        name: "ztree.css"
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
