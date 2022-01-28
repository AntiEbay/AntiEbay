# AntiEbay

Nowadays, websites selling all kind of products (see Amazon, Ebay, etc.) follow a straightforward business model.
They expose the product they want to sell, they provide some description, price, images, and feedback from customers who already purchased the product.

Our goal is to revolutionize the selling process by highlighting the needs of the buyer rather than
the products of the seller. This website should work exactly as the opposite of Ebay. Instead of advertising the products available, we should focus on the needs of the customer and let the sellers compete for the customers.

# Objectives

<ul>
  <li>Create a website</li>
  <li>Handle seller and buyer profiles (login, rights, etc.)</li>
  <li>Provide visually appealing  graphical interface to describe the needs of the buyer</li>
  <li>Provide searchability capabilities for the sellers, ranking, bidding, etc.</li>
</ul>

# How To Run

The application is setup with a series of docker images that can be all run using the included docker-compose configuration. To start, use the command : `docker-compose build` followed by `docker-compose up`. There are included scripts for bash and windows command line that do this in one step.
<ul>
    <li>Bash : start-all-services_bash.sh</li>
    <li>Windows : start-all-services_windows-cmd.bat</li>
</ul>
