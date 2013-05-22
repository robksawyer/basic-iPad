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
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		copy: {
			dist: {
				files: [
					{expand: true, src: ['<% config.build %>/img/**'], dest: '<% config.dist %>', filter: 'isFile'},
					{expand: true, src: ['<% config.build %>/js/**'], dest: '<% config.dist %>', filter: 'isFile'},
					{expand: true, src: ['<% config.build %>/tools/**'], dest: '<% config.dist %>', filter: 'isFile'},
					{expand: true, src: ['<% config.build %>/css/**'], dest: '<% config.dist %>', filter: 'isFile'},
					{expand: true, src: ['<% config.build %>/{,*/}*.{html,js,txt,xml,ico}'], dest: '<% config.dist %>', filter: 'isFile'}
				]
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('default', ['jshint', 'copy', 'qunit', 'concat', 'uglify']);

};