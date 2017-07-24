require 'bundler'
Bundler.require

run Sinatra::Application

get '/' do

	"Hi"

end
	
