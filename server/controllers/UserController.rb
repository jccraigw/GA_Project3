require 'SecureRandom'

class UserController < ApplicationController

  get '/' do
    user = User.all
    user.to_json
  end

  get '/register' do
    user = User.all
    user.to_json
  end

  #post request to /users/register
  post '/register' do
    user_details = JSON.parse(request.body.read)
    user = User.new
    user.email = user_details["email"]
    user.password = user_details["password"]
    user.street = user_details["street"]
    user.name = user_details["name"]
    user.street_pt_two = user_details["street_pt_two"]
    user.city = user_details["city"]
    user.state = user_details["state"]
    user.zip = user_details["zip"]
    user.token = SecureRandom.hex
    user.save
    user.to_json
  end

  #post request to /users/login
  post '/login' do
    user_details = JSON.parse(request.body.read)
    user = User.find_by({email: user_details["email"]})
    if user && user.authenticate(user_details["password"])
      user.to_json
    else
      {message: "ACCESS DENIED" }.to_json
    end
  end

  patch '/:id' do
    id= params[:id]
    user_details = JSON.parse(request.body.read)
    user = User.find(id)
    user.update_attributes(user_details)
    user.save
    user.to_json
  end
end