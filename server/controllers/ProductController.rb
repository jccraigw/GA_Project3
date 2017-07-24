class ProductController < ApplicationController

	#get request to products
	get '/' do

		product = Product.all
		product.to_json

	end
	#get request to products/:id
	get '/:id' do

		id = params[:id]
		product = Product.find(id)
		product.to_json

	end
	#post request to products
	post '/' do

	product_details = JSON.parse(request.body.read)
	product = Product.new
	product.name = product_details["name"]
	product.price = product_details["price"]
	product.color = product_details["color"]
	product.size = product_details["size"]
	product.image_url = product_details["image_url"]

	product.save
	product.to_json


	end
	#patch request to products/:id
	patch '/:id' do

		id = params[:id]
		product = Product.find(id)
		request_body = JSON.parse(request.body.read)
		product.update_attributes(request_body)
		product.save
		Product.all.to_json



	end
	#delete request to products/:id
	delete '/:id' do

		id = params[:id]
		product = Product.find(id)
		product.destroy
		Product.all.to_json

	end

end