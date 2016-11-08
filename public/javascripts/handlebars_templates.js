this["JST"] = this["JST"] || {};

this["JST"]["add_card"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"add_to_board\" id='add_card_form' method='post' action='#'><textarea></textarea><input type='submit' value=\"Add\" /><a class='close_card_form' href='#'></a></form>";
},"useData":true});

this["JST"]["board_index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"boards?board="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a><i class=\"fa fa-trash-o fa-lg\" aria-hidden=\"true\"></i>";
},"useData":true});

this["JST"]["board_show"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section id=\"show_board\"><div id='board_title'><h1>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1><form method='post' action='#' id='edit_board_form'><h3>Rename Board</h3><a href=\"#\" class='close'></a><label for='name'>Title</label><input type='text' name='name' id='edit_board_name' value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"/><p class='error_msg'>Invalid Name</p><input type='submit' value='Rename' /></form></div><ul id='lists_index' class='list_sortable'><li id='add_list_group' class='not_sortable'><div class='add_list'>Add a list...</div><form class='add_to_board' id='add_list_form' method='post' action'#'><input type='text' name='name' id='list_name_input' placeholder='Add a list...'/><p class='error_msg'>Invalid Name</p><input type='submit' class='success_submit' value='Save'/><a class=\"close_list_form\" href=\"#\"></a></form></li></ul></section><div id='card_show_view'></div>";
},"useData":true});

this["JST"]["card_show"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h6>Description <span class='edit_card_description'>Edit</span></h6><p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<h6><span class='highlight edit_card_description'><i class='fa fa-pencil-square-o fa-lg'></i>Edit the description</span></h6>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id='modal_layer'></div><div id='card_shown'><a href='#'><i class=\"fa fa-times-thin fa-2x\"></i></a><div id=\"card_show_left\"><section id='card_info'><div id='card_name'><i class=\"fa fa-trello fa-rotate-90 fa-lg\" aria-hidden=\"true\"></i><h2 contenteditable='true'>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2><h6>in list <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.list : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span></h6></div><div id='card_labels'></div><div id='card_due_date'></div><div id='card_description'>"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.description : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "<form id=\"card_description_form\" class='card_show_forms'><textarea name='card_description'>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea><input type='submit' value='Save' /> <i class=\"fa fa-times-thin fa-2x\" id='close_desc_form'></i></form></div></section><section id='card_info'><div><i class=\"fa fa-commenting fa-lg\" aria-hidden=\"true\"></i><h2>Add Comment</h2></div><div id='comment_form'><form id=\"card_comment_form\" class='card_show_forms'><textarea name='card_comment' placeholder='Add a comment'></textarea><input type='submit' value='Send' disabled/></form></div><div id='card_comments'></div></section><section id='activity_info'><div><i class=\"fa fa-tasks fa-lg\" aria-hidden=\"true\"></i><h2>Activity</h2></div><div id='activity_list'></div></section></div><div id='card_show_right'><section id='card_show_actions'><h2>Add</h2><ul id='card_show_add'><li id='card_show_add_label'><span><i class=\"fa fa-tags fa-lg\" aria-hidden=\"true\"></i>Labels</span></li><li id='card_show_add_checklist'><span><i class=\"fa fa-list-ol fa-lg\" aria-hidden=\"true\"></i>Checklist</span></li><li id='card_show_add_duedate'><span><i class=\"fa fa-calendar fa-lg\" aria-hidden=\"true\"></i>Due Date</span></li></ul><ul id='card_show_actions'></ul></section></div></div>";
},"useData":true});

this["JST"]["card_view"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class='card_actions'><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></span>";
},"useData":true});

this["JST"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='main_content'><h2><i class=\"fa fa-user-circle-o fa-lg\" aria-hidden=\"true\"></i>Personal Boards</h2><ul class='boards_list sortable' id='boards_list'><li class='new_board'><a href='#'>Create new board...</a></li><li class='form'><form method='post' action='#' id='new_board_form'><h3>Create Board</h3><a href=\"#\" class='close'></a><label for='name'>Title</label><input type='text' name='name' id='new_board_name' placeholder='E.g Todo List...'/><p class='error_msg'>Invalid Name</p><input type='submit' value='Create' /></form></li></ul></div>";
},"useData":true});

this["JST"]["layout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header><nav class='navbar'><div class=\"logo\"><a href=\"#\" class='brand'><span><i class=\"fa fa-trello fa-lg fa-pulse\" aria-hidden=\"true\"></i></span>BOARDZ</a></div><ul class=\"nav-actions-left\"><li id='list_boards'><i class=\"fa fa-trello fa-rotate-90 fa-lg\" aria-hidden=\"true\"></i>&nbsp Boards</li><li id='nav_search'><form id=\"nav_search_form\" method='get' action='#'><input type='text' name='search_term' id='search_term' /></form><i class=\"fa fa-search fa-flip-horizontal fa-lg\" aria-hidden=\"true\"></i></li></ul><!----><ul class=\"nav-actions-right\"><li id='nav_add_board'><span title=\"Clear all boards\"><i class=\"fa fa-trash fa-flip-horizontal fa-lg\" aria-hidden=\"true\"></i></span></li></ul></nav></header><main></main>";
},"useData":true});

this["JST"]["list_view"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class='list_title'><h3 contenteditable='true' tabindex='-1' class='contenteditable'>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3><i class=\"fa fa-trash-o fa-lg\" aria-hidden=\"true\"></i></div><div class='cards'><ul class='card_list card_sortable'></ul></div><div class='add_card'>Add a card...</div>";
},"useData":true});