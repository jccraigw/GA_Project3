class ApplicationController < Sinatra::Base


	options '*' do
	    response['Access-Control-Allow-Headers'] = 'content-type'
	    response['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,DELETE'
	    200
  	end

  	before do

  		response['Access-Control-Allow-Origin'] = '*'
    	content_type :json


  	end

end

