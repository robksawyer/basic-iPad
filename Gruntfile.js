module.exports = function(grunt) {

	// configurable paths
	var appConfig = {
		build: 'build',
		dist: 'dist'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: appConfig,
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['build/js/vendor/{,*/}*.js'],
				dest: './tmp/vendor.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/js/vendor.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			options: {
				// options here to override JSHint defaults
				browser: true,
				loopfunc: false,
				globals: {
					jQuery: true,
					document: true,
					window: true
				}
			},
			all: [
				'Gruntfile.js', 
				'build/js/{,*/}*.js',
				'!build/js/helper.js',
				'!build/js/plugins.js',
				'!build/js/vendor/*',
				'test/**/*.js'
			]
		},
		copy: {
			dist: {
				files: [{
						expand: true, 
						cwd: '<%= config.build %>',
						dest: '<%= config.dist %>',
						src: [
							'*.{ico,txt,xml}',
							'.htaccess',
							'*.{html,js}',
							'img/**',
							'js/*.js',
							'js/vendor/vendor.min.js',
							//'js/<%= pkg.name %>.js',
							'tools/**',
							'css/**'
						]
				}]
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy:dist']);

};