$(document).ready(function() {
  /* PREPARE LISTENERS */

  /* Listener users tab */
  $("#users").click(function() {
    switch_tab("#container_users", "#users");
  });

  /* Listener repos tab */
  $("#repos").click(function() {
    switch_tab("#container_repos", "#repos");
  });

  /* Listener organizations tab */
  $("#orgs").click(function() {
    switch_tab("#container_orgs", "#orgs");
  });

  /* Listener commits tab */
  $("#commits").click(function() {
    switch_tab("#container_commits", "#commits");
  });

  /* Listener users search */
  $("#users_search").click(function() {
    fetch_users();
  });

  /* Listener repos search */
  $("#repos_search").click(function() {
    fetch_repos();
  });

  /* Listener organizations search */
  $("#orgs_search").click(function() {
    fetch_orgs();
  });

  /* Search queries may also be submitted by pressing the enter button     */
  $("#users_search_input").keypress(function(e) {
    if (e.keyCode == "13") {
      fetch_users();
    }
  });
  $("#repos_search_input").keypress(function(e) {
    if (e.keyCode == "13") {
      fetch_repos();
    }
  });
  $("#orgs_search_input").keypress(function(e) {
    if (e.keyCode == "13") {
      fetch_orgs();
    }
  });
  /* Default: got to user table */
  switch_tab("#container_users", "#users");
});

//FETCH USERS
function fetch_users() {
  $("#users_table tbody").empty();
  var search_by = $("select[name=users_search_by]").val();
  var api_urls = {
    orgs:
      "https://api.github.com/orgs/" +
      $("#users_search_input").val() +
      "/members",
    repos:
      "https://api.github.com/repos/github/" +
      $("#users_search_input").val() +
      "/contributors"
  };
  var api_url = api_urls[search_by];
  $.ajax({
    method: "GET",
    url: api_url,
    success: function(res) {
      if (res.length == 0) {
        no_results("#users_table tbody");
        return;
      }
      console.log(res);
      for (var user in res) {
        $("#users_table tbody").append(
          "<tr><td><a href=" +
            res[user].html_url +
            ">" +
            res[user].login +
            "</a></td><td><button onclick=switch_tab(" +
            '"#container_orgs","#orgs"' +
            ");" +
            'user_to_orgs("' +
            res[user].login +
            '")' +
            ">Organizations" +
            "</button></td><td><button onclick=switch_tab(" +
            '"#container_repos","#repos"' +
            ");" +
            'user_to_repos("' +
            res[user].login +
            '")' +
            ">Repositories" +
            "</button></td></tr>"
        );
      }
    },
    error: function(res) {
      no_results("#users_table tbody");
    }
  });
}

//FETCH REPOSITORIES
function fetch_repos() {
  $("#repos_table tbody").empty();
  var search_by = $("select[name=repos_search_by]").val();
  var api_url =
    "https://api.github.com/" +
    search_by +
    $("#repos_search_input").val() +
    "/repos";
  $.ajax({
    method: "GET",
    url: api_url,
    data: {
      type: "public"
    },
    success: function(res) {
      console.log(res);
      if (res.length == 0) {
        no_results("#repos_table tbody");
        return;
      }
      for (var repo in res) {
        var date_updated = new Date(res[repo].updated_at).toLocaleString();
        $("#repos_table tbody").append(
          "<tr><td><a href=" +
            res[repo].html_url +
            ">" +
            res[repo].name +
            "</a></td><td><button onclick=switch_tab(" +
            '"#container_users","#users"' +
            ");" +
            'repo_to_users("' +
            res[repo].name +
            '")' +
            ">Members" +
            "</button></td><td>" +
            date_updated +
            "</td><td><button onclick=switch_tab(" +
            '"#container_commits","#commits"' +
            ");" +
            'fetch_commits("' +
            res[repo].owner.login +
            '","' +
            res[repo].name +
            '")' +
            ">Commits" +
            "</button></td><td>" +
            res[repo].description +
            "</td></tr>"
        );
      }
    },
    error: function(res) {
      no_results("#repos_table tbody");
    }
  });
}

//FETCH ORGANIZATIONS
function fetch_orgs() {
  $("#orgs_table tbody").empty();
  var search_by = $("select[name=orgs_search_by]").val();
  var api_urls = {
    users:
      "https://api.github.com/users/" + $("#orgs_search_input").val() + "/orgs"
  };
  var api_url = api_urls[search_by];
  $.ajax({
    method: "GET",
    url: api_url,
    success: function(res) {
      console.log(res);
      if (res.length == 0) {
        no_results("#orgs_table tbody");
        return;
      }
      for (var org in res) {
        $("#orgs_table tbody").append(
          "<tr><td>" +
            res[org].login +
            "</td><td><button onclick=switch_tab(" +
            '"#container_users","#users"' +
            ");" +
            'org_to_users("' +
            res[org].login +
            '")' +
            ">Members" +
            "</button></td><td><button onclick=switch_tab(" +
            '"#container_repos","#repos"' +
            ");" +
            'org_to_repos("' +
            res[org].login +
            '")' +
            ">Repositories" +
            "</button></td><td>" +
            res[org].description +
            "</td></tr>"
        );
      }
    },
    error: function(res) {
      no_results("#orgs_table tbody");
    }
  });
}

//FETCH COMMITS
function fetch_commits(owner, repo) {
  $("#commits_table tbody").empty();
  var api_url =
    "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
  $.ajax({
    method: "GET",
    url: api_url,
    success: function(res) {
      if (res.length == 0) {
        no_results("#commits_table tbody");
        return;
      }
      console.log(res);
      for (var commit in res) {
        console.log(commit);

        $("#commits_table tbody").append(
          "<tr><td>" +
            res[commit].commit.committer.date +
            "</td><td>" +
            res[commit].commit.committer.name +
            "</td><td>" +
            res[commit].commit.committer.email +
            "</td><td>" +
            res[commit].commit.message +
            "</td></tr>"
        );
      }
    },
    error: function(res) {
      no_results("#commits_table tbody");
    }
  });
}

/* Display error when no results were found */
function no_results(tbody) {
  $(tbody).append("<tr><td>Your search gave no results</td></tr>");
}

/* Functions for interfunctionality */
/* Users -> Repos */
function user_to_repos(ref) {
  $("#repos_search_input").val(ref);
  $("select[name=repos_search_by]").val("users/");
  fetch_repos();
}
/* Users -> Orgs */
function user_to_orgs(ref) {
  $("#orgs_search_input").val(ref);
  $("select[name=orgs_search_by]").val("users");
  fetch_orgs();
}
/* Repos -> Users */
function repo_to_users(ref) {
  $("#users_search_input").val(ref);
  $("select[name=users_search_by]").val("repos");
  fetch_users();
}
/* Orgs -> Users */
function org_to_users(ref) {
  $("#users_search_input").val(ref);
  $("select[name=orgs_search_by]").val("users");
  fetch_users();
}
/* Orgs -> Repos */
function org_to_repos(ref) {
  $("#repos_search_input").val(ref);
  $("select[name=repos_search_by]").val("orgs/");
  fetch_repos();
}

/* Clears containerareas being displayed */
function blank_view() {
  $(".container").hide();
  $("#popups").hide();
  $(".button").css("background", "#454f8c");
}

/* Switches between tabs */
function switch_tab(view, button) {
  blank_view();
  $(view).show();
  $(button).css("background", "#ff9e01");
}
