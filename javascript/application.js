// :event_items
// t.integer :event_id
// t.integer :item_id

// t.string  :guest_name
// t.string  :guest_email
// t.integer :quantity_provided
//----------------------------Event related  functions ----------------------------//
function Item(name, suggestion, quantity){
  this.name                  = name;
  this.suggestion            = suggestion;
  this.quantityNeeded        = quantity;
  this.eventsItemsTemplate   = '<div class="events_items"><div class="name">'+ this.name +'</div><div class="suggestion">'+ this.suggestion +'</div><div class="quantity_needed">' + this.quantityNeeded +'</div><div>';
}

Item.prototype = {
      constructor: Item,
  updateItemDetails: function(name, suggestion, quantity){
                      this.name                   = name;
                      this.suggestion             = suggestion;
                      this.quantityNeeded         = quantity;
                    },
    addGuestDetails: function(quantityProvided, guestEmail, guestName){
                       this.quantityProvided      = quantityProvided;
                       this.guestEmail            = guestEmail;
                       this.guestName             = guestName;
                       this.assignedItemsTemplate = '<div class="assigned_item"><div class="name">'+ this.name +'</div><div class="guest_name">'+ this.guestName + '</div><div class="guest_email">'+ this.guestEmail + '</div><div class="quantity_provided">' + this.quantityProvided + '</div><div>';
                    }
};

function Event(){
  this.items     = [];
}

Event.prototype = {
  constructor: Event,
   addDetails: function(eventName, place, date, description){
                  this.eventName = eventName;
                  this.desc      = description;
                  this.date      = date;
                  this.place     = place;
                  this.template  = '<div class="event_form"><div class="name" placeholder="Title">'+ this.eventName +
                   '</div><div class ="place" placeholder="Location">'+ this.place +
                   '</div><div type="datetime" class="date" placeholder="Date">'+ this.date +
                   '</div><div class="description" placeholder="Description">'+ this.desc +
                   '</div></div>';
                },
           add: function(item){
                  this.items.push(item);
                }
};
//----------------------------Rendering functions ----------------------------//
var EventRenderer = {
          render: function(newEvent){
                    // console.log(newEvent);
                    $('.event_form').hide();
                    $('.event_details').append(newEvent.template);
                  },
      submitForm: function(newEvent){
                    var eventName = $('.event_name').val();
                    var place = $('.place').val();
                    var date = $('.date').val();
                    var description = $('.description').val();
                    newEvent.addDetails(eventName, place, date, description);
                    this.render(newEvent);
                    $('.items_form').css('display', '');
                  },

 displayAllItems: function(newEvent){
                    newEvent.items.forEach(ItemRenderer.render);
                  }
};

var ItemRenderer = {
  createItem: function(){
                var name = $('.item_name').val();
                var sug = $('.suggestion').val();
                var quantity = $('.quantity_needed').val();
                var newItem = new Item(name, sug, quantity);
                return newItem;
              },
      render: function(element, index, array){
                $('.added_items').append(element.eventsItemsTemplate);//.fadeIn(800);
              }
};

function NewEventForm(){
    var myEvent        = new Event();
    var addEventNode   = $('.add_event');
    var addItemNode    = $('.add_item');
    var eventItemsNode = $('.added_items');

    addEventNode.on('click', function(){
      EventRenderer.submitForm(myEvent);
    });

    addItemNode.on('click', function(){
      createdItem = ItemRenderer.createItem();
      myEvent.add(createdItem);
      ItemRenderer.render(createdItem);
    });
    $('.save_event').on('click', function(){
      $.post('/events', myEvent);
    });
}

$(function(){
  NewEventForm();
});
