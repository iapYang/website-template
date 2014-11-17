module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')

		less: 
			dev:
				options:
					compress: true
				files: [
					expand: true
					cwd: 'dev'
					src: ['**/*.less', '!vendors/**']
					dest: 'dev'
					ext: '.css'
				]
			build: 
				options:
					compress: true
				files: [
					expand: true
					cwd: 'output'
					src: ['**/*.less', '!vendors/**']
					dest: 'dist'
					ext: '.css'
				]

		watch: 
			dev:
				options: 
					livereload: true
				files: ['**/*.less', '!vendors/**']
				tasks: ['less:dev']

		clean:
			build:
				src: ['dist', 'archive.zip']

		htmlmin:
			build:
				options: 
					removeComments: true
					collapseWhitespace: true
				files: [
					expand: true
					cwd: 'output'
					src: ['**/*.html', '!vendors/**']
					dest: 'dist'
					ext: '.html'
				]

		uglify:
			build:
				options: null
				files: [
					expand: true
					cwd: 'output'
					src: ['**/*.js', '!vendors/**']
					dest: 'dist'
					ext: '.js'
				]

		imagemin:
			build:
				options: 
					optimizationLevel: 3
				files: [
					expand: true
					cwd: 'output'
					src: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '!vendors/**']
					dest: 'dist'
				]

		copy:
			build:
				options: null
				files: [
					expand: true
					cwd: 'output'
					src: ['**/*', '!images/**', '!scripts/**', '!styles/**', '!*']
					dest: 'dist'
				]

		compress:
			build:
				options: 
					archive: 'archive.zip'
				files: [
					src: ['dist/**']
				]


	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-htmlmin'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-imagemin'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-compress'
	

	grunt.registerTask 'default', ['watch:dev']
	grunt.registerTask 'build', ['clean:build', 'less:build', 'uglify:build', 'htmlmin:build', 'imagemin:build', 'copy:build', 'compress:build']






