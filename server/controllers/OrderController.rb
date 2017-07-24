class OrderController < ApplicationController

	#post request to orders

	get '/' do

		order = Order.all
		order.to_json
	end

	get '/:id' do

		id = params[:id]

	end

	post '/' do


		order_details = JSON.parse(request.body.read)
		order = Order.new
		order.name = order_details["name"]
		order.id_users = order_details["id_users"]
		puts  "id users" + order.id_users.to_s
		order.id_products = order_details["id_products"]

		orders = Order.find_by(id_users: order.id_users)

		p "current" + orders.to_json

		if orders.nil?
			cart = Cart.new

			cart.save
			p cart.id
			order.id_carts = cart.id
		elsif orders.id_carts == nil 
			cart = Cart.new
			cart.save
			p cart.id
			order.id_carts = cart.id

		else 
			 order.id_carts = orders.id_carts
		
		end
		order.save
		order.to_json


	end

	delete '/:id' do
		id = params[:id]

		order = Order.find(id)
		order.destroy

		orders = Order.all
		orders.to_json

	end




end