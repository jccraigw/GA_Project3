class ChargesController < ApplicationController

post '/' do 
	Stripe.api_key = "pk_test_uOVzn2S0ha9lIfbrQQVftaeb"
request_body = JSON.parse(request.body.read)
# Token is created using Stripe.js or Checkout!
# Get the payment token ID submitted by the form:
token = request_body["stripeToken"]
p token
puts params
# Charge the user's card:
charge = Stripe::Charge.create(
  :amount => 1000,
  :currency => "usd",
  :description => "Example charge",
  :source => token,
)

end
end