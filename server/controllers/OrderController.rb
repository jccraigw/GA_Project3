class OrderController < ApplicationController

	#post request to orders
	get '/cart' do
		order = Order.all
		order.to_json
	end

	get '/cart/:id' do
		id = params[:id]
		orders = Order.where(id_users: id)
		total = 0;
		cart_num = 0;

		orders.each do |order|
			total = total + order.price * order.quantity
			cart_num = cart_num + order.quantity
		end
		# p total.round	
		{orders: orders, total: total, cart_num: cart_num }.to_json
	end

	get '/cart/:id/checkout' do
		id = params[:id]
		orders = Order.where(id_users: id)
		user = User.find(id)
		total = 0;

		orders.each do |order|
			total = total + order.price * order.quantity
		end
		# p total.round
		# p "total"
		{orders: orders, total: total, user: user}.to_json	
	end

	post '/' do
		order_details = JSON.parse(request.body.read)
		order = Order.new
		order.name = order_details["name"]
		order.id_users = order_details["id_users"]
		puts  "id users" + order.id_users.to_s
		order.id_products = order_details["id_products"]
		order.quantity = order_details["quantity"]
		order.price = order_details["price"]
		order.size = order_details["size"]
		order.color = order_details["color"]
		order.image_url = order_details["image_url"]

		orders = Order.find_by(id_users: order.id_users)
		# p "current" + orders.to_json
		if orders.nil?
			cart = Cart.new
			cart.save
			# p cart.id
			order.id_carts = cart.id
		elsif orders.id_carts == nil 
			cart = Cart.new
			cart.save
			# p cart.id
			order.id_carts = cart.id
		else 
			order.id_carts = orders.id_carts	
		end
		order.save
		{order: order}.to_json
	end

	patch '/cart/:id' do
		id = params[:id]
		order = Order.find(id)
		request_body = JSON.parse(request.body.read)
		order.update_attributes(request_body)
		order.save
		Order.all.to_json
	end

	delete '/cart/:id' do
		id = params[:id]
		order = Order.find(id)
		order.destroy
		orders = Order.all
		total = 0;
		cart_num = 0;

		orders.each do |order|
			total = total + order.price * order.quantity
			cart_num = cart_num + order.quantity
		end
		{orders: orders, total: total, cart_num: cart_num }.to_json
	end
end