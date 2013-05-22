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
				dest: 'build/js/vendor.js'
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
					console: true,
					module: true,
					document: true
				}
			},
			files: ['Gruntfile.js', 'build/{,*/}*.js', 'test/**/*.js']
		},
		copy: {
			dist: {
				files: [
					{expand: true, src: ['<% config.build %>/img/**'], dest: '<% config.dist %>/'},
					//{expand: true, src: ['<% config.build %>/js/**'], dest: '<% config.dist %>/'},
					{expand: true, src: ['<% config.build %>/js/vendor/**'], dest: '<% config.dist %>/js/'},
					{expand: true, src: ['<% config.build %>/js/<%= pkg.name %>.js'], dest: '<% config.dist %>/js/', filter: 'isFile'},
					{expand: true, src: ['<% config.build %>/tools/**'], dest: '<% config.dist %>/'},
					{expand: true, src: ['<% config.build %>/css/**'], dest: '<% config.dist %>/'},
					{expand: true, src: ['<% config.build %>/{,*/}*.{html,js,txt,xml,ico}'], dest: '<% config.dist %>/', filter: 'isFile'}
				]
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

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);

};