Restaurant Order Tool
=====================

Introduction
------------

A tool to ease the ordering of food from a Restaurant built for my friend Mehdi. He wanted a tool that would ease the calculation of the final cost of an order that had been phoned through to the [restaurant](http://www.currygardenindianrestaurant.co.uk/) where he sometimes works.

I've been playing with [using a Google Spreadsheet as a data source](https://github.com/annoyingmouse/GDB) for ages so thought I'd leverage that and the ability to access the data in json format. Feel free to copy the [Spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AiRgQIhodQXfdGdkVDVTRUFsN09sbFhYVVEzYlZMMXc&usp=sharing) and adapt for your needs.

Resources
---------

* [Bootstrap](http://twitter.github.io/bootstrap/)
* [jQuery](http://jquery.com/)
* [DataTable](http://datatables.net/)

Future
------

I'm going to make a simple site with the menu on it as it is on the web-app using the data from the Spreadsheet next and I'm pondering the ease of making this more public so that people could either SMS or email orders in...

This might mean that I'll have to consume the data on the server using something like PHP, but at least this would mean that there would be one canonical source for the data.

I'm also pondering altering the table so that if two dishes occur in two categories then they'll be distinguished. For instance: it might be that the same dish is offered both as a main and as a starter and comes in different portion sizes and for different costs - but at the present they would need to have different names in order for the application to work correctly - that's not ideal, so it would be worthwhile having an extra column with an indication of whether the dish is a starter or a main.

It might also be worthwhile to add space for special instructions (extra garlic!!!!).
