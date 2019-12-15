<head>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="GithubApiExplorer.js"></script>
    <link href="master.css" rel="stylesheet">
</head>

<body>
    <section class="mainPage">

        <body>
            <header>
                <div class="buttonarea">
                    <button id="users" class="button">Users</button>
                    <button id="repos" class="button">Repositories</button>
                    <button id="orgs" class="button">Organizations</button>
                    <button id="commits" class="button">Commits</button>
                </div>
            </header>

            <div id="container_users" class="container">
                <div class="searchrow">
                    <input type="text" id="users_search_input" placeholder="Search">
                    <label>Search by:</label>
                    <select name="users_search_by" id="users_search_by" class="search_by">
                        <option value="orgs" default="default">Organization</option>
                        <option value="repos">Repository</option>
                    </select>
                    <button id="users_search">Search</button>

                </div>
                <table id="users_table">
                    <thead>
                        <tr>
                            <th>Login name</th>
                            <th>Organizations</th>
                            <th>Repositories</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table>
            </div>

            <div id="container_repos" class="container">
                <div class="searchrow">
                    <input type="text" id="repos_search_input" placeholder="Search">
                    <label>Search by:</label>
                    <select name="repos_search_by" id="repos_search_by" class="search_by">
                        <option value="orgs/" default="default">Organization</option>
                        <option value="users/">User</option>
                    </select>
                    <button id="repos_search">Search</button>

                </div>
                <table id="repos_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Members</th>
                            <th>Updated</th>
                            <th>Commits</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            <div id="container_orgs" class="container">
                <div class="searchrow">
                    <input type="text" id="orgs_search_input" placeholder="Search">
                    <label>Search by:</label>
                    <select name="orgs_search_by" id="orgs_search_by" class="search_by">
                        <option value="users" default="default">User</option>
                    </select>
                    <button id="orgs_search">Search</button>

                </div>
                <table id="orgs_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Members</th>
                            <th>Repositories</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div id="container_commits" class="container">
                <table id="commits_table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Author</th>
                            <th>Author email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
    </section>
</body>