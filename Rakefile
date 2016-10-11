require 'aws-sdk'
require 'dotenv'
Dotenv.load

task 'deploy' do
  ignored_files = %w(env.sample README.md Rakefile Gemfile Gemfile.lock Vagrantfile vsetup.sh . ..)

  Rake::Task['build'].invoke

  s3 = Aws::S3::Resource.new(
    credentials: Aws::Credentials.new(ENV['AWS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
    region: ENV['AWS_REGION']
  )

  Dir.glob('_site/**/*') do |file|
    remote_file = file.gsub('_site/', '')
    next if ignored_files.include?(remote_file) || FileTest.directory?(file)

    obj = s3.bucket(ENV['AWS_BUCKET']).object(remote_file)
    obj.upload_file(file, acl: 'public-read')

    puts "Uploading #{obj.public_url}"
  end

  puts "Done!. Go to #{ENV['AWS_WEBSITE']}"
end

task 'build' do
  sh 'jekyll build'
end
