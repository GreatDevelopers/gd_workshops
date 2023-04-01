### Setup new Frappe App to version control with GitHub

```sh
frappe@exp:~/frappe-bench/apps/karan$ cat  .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
frappe@exp:~/frappe-bench/apps/karan$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        karan/karan/doctype/
        karan/www/

nothing added to commit but untracked files present (use "git add" to track)
frappe@exp:~/frappe-bench/apps/karan$ git add .
frappe@exp:~/frappe-bench/apps/karan$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   karan/karan/doctype/__init__.py
        new file:   karan/karan/doctype/rai_test/__init__.py
        new file:   karan/karan/doctype/rai_test/rai_test.js
        new file:   karan/karan/doctype/rai_test/rai_test.json
        new file:   karan/karan/doctype/rai_test/rai_test.py
        new file:   karan/karan/doctype/rai_test/test_rai_test.py
        new file:   karan/www/hsr.html
        new file:   karan/www/hsr.py
        new file:   karan/www/rai.md
        new file:   karan/www/rai.md~

frappe@exp:~/frappe-bench/apps/karan$

 vi .gitignore
 # Line added:
 # **/*~
 git restore --staged **/*~
 git add .gitignore

git config --global user.email "hardeep.rai@exp.gne"
git config --global user.name "HSRExp"

git commit -m "Test app to experiment"
[master 5fc6987] Test app to experiment
 10 files changed, 202 insertions(+), 1 deletion(-)
 create mode 100644 karan/karan/doctype/__init__.py
 create mode 100644 karan/karan/doctype/rai_test/__init__.py
 create mode 100644 karan/karan/doctype/rai_test/rai_test.js
 create mode 100644 karan/karan/doctype/rai_test/rai_test.json
 create mode 100644 karan/karan/doctype/rai_test/rai_test.py
 create mode 100644 karan/karan/doctype/rai_test/test_rai_test.py
 create mode 100644 karan/www/hsr.html
 create mode 100644 karan/www/hsr.py
 create mode 100644 karan/www/rai.md
frappe@exp:~/frappe-bench/apps/karan$

frappe@exp:~/frappe-bench/apps/karan$ gh auth login
? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Paste an authentication token
Tip: you can generate a Personal Access Token here https://github.com/settings/tokens
The minimum required scopes are 'repo', 'read:org', 'workflow'.
? Paste your authentication token: ****************************************
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as hsrai
frappe@exp:~/frappe-bench/apps/karan$

frappe@exp:~/frappe-bench/apps/karan$ gh repo create
? What would you like to do? Push an existing local repository to GitHub
? Path to local repository .
? Repository name FrappeAppGD
? Description To test web pages, a test app
? Visibility Public
✓ Created repository hsrai/FrappeAppGD on GitHub
? Add a remote? Yes
? What should the new remote be called? origin
✓ Added remote https://github.com/hsrai/FrappeAppGD.git
? Would you like to push commits from the current branch to the "origin"? Yes
✓ Pushed commits to https://github.com/hsrai/FrappeAppGD.git
frappe@exp:~/frappe-bench/apps/karan$
```
