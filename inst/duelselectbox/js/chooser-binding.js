(function() {

function updateChooser(chooser) {
    chooser = $(chooser);
    var left = chooser.find(".select.left");
    var right = chooser.find(".select.right");
    var leftArrow = chooser.find(".left-arrow");
    var rightArrow = chooser.find(".right-arrow");

    var canMoveTo = (left.val() || []).length > 0;
    var canMoveFrom = (right.val() || []).length > 0;

    leftArrow.toggleClass("muted", !canMoveFrom);
    rightArrow.toggleClass("muted", !canMoveTo);
}

function move(chooser, source, dest_str) {
    chooser = $(chooser);
    var selected = chooser.find(source).children(".selected-item");
    var dest = chooser.find(dest_str);
    dest.children(".selected-item").each(function(i, e) {
      e.selected = false;
    });

    if (dest_str === ".right") {
      selected.each(function() {
        $(this).append("<i class='fas fa-arrows-alt-v handler'></i>")
      });
    } else {
      selected.each(function() {
       let node = $(this).find("i").remove()
      });
    }

    dest.append(selected);
    updateChooser(chooser);
    chooser.trigger("change");

    // remove selected class
    document.querySelectorAll(".selected-item").forEach(x => {
      x.classList.remove("selected-item")
    })
}

function moveAll(chooser, source, dest_str) {
    chooser = $(chooser);
    var selected = chooser.find(source).children('.chooser-item');
    var dest = chooser.find(dest_str);
    dest.children("selected-item").each(function(i, e) {
      e.selected = false;
    });
    dest.append(selected);
    updateChooser(chooser);
    chooser.trigger("change");

    if (dest_str === ".right") {
      selected.each(function() {
        $(this).append("<i class='fas fa-arrows-alt-v handler'></i>")
      });
    } else {
      selected.each(function() {
      let node = $(this).find("i").remove()
      });
    }


    // remove selected class
    document.querySelectorAll(".selected-item").forEach(x => {
      x.classList.remove("selected-item")
    })
}

$(document).on("change", ".chooser select", function() {
    updateChooser($(this).parents(".chooser"));
});

$(document).on("click", ".chooser .right-arrow", function() {
    move($(this).parents(".chooser"), ".left", ".right");
});

$(document).on("click", ".chooser .left-arrow", function() {
    move($(this).parents(".chooser"), ".right", ".left");
});

$(document).on("click", ".chooser .all-left-arrow", function() {
    moveAll($(this).parents(".chooser"), ".right", ".left");
});

$(document).on("click", ".chooser .all-right-arrow", function() {
    moveAll($(this).parents(".chooser"), ".left", ".right");
});

$(document).on("click", ".chooser-item", function() {
    $(this).addClass("selected-item")
});

$(document).on("click", ".selected-item", function() {
    $(this).removeClass("selected-item")
});


$(document).on("dblclick", ".chooser select.left", function() {
    move($(this).parents(".chooser"), ".left", ".right");
});

$(document).on("dblclick", ".chooser select.right", function() {
    move($(this).parents(".chooser"), ".right", ".left");
});

var binding = new Shiny.InputBinding();

binding.find = function(scope) {
  return $(scope).find(".chooser");
};

binding.initialize = function(el) {
  updateChooser(el);
};

binding.getValue = function(el) {
  return {
    left: $("#mychooser")
    .find(".select.left")
    .find(".chooser-item").map(function() {
    return $(this).text();
    }).get(),
    right: $("#mychooser")
    .find(".select.right")
    .find(".chooser-item").map(function() {
      return $(this).prop('innerText').replace("\n", "")
    }).get()
  }
};

binding.setValue = function(el, value) {
  // TODO: implement
};

binding.subscribe = function(el, callback) {
  $(el).on("change.chooserBinding", function(e) {
    callback();
  });
};

binding.unsubscribe = function(el) {
  $(el).off(".chooserBinding");
};

binding.getType = function() {
  return "duelselectbox.chooser";
};

Shiny.inputBindings.register(binding, "duelselectbox.chooser");

})();
