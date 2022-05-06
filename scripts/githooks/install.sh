#!/bin/bash

# pre-commit hook
echo "#!/bin/bash
./scripts/githooks/pre-commit" > .git/hooks/pre-commit
chmod 755 .git/hooks/pre-commit

# commit-msg hook
echo "#!/bin/bash
./scripts/githooks/commit-msg" > .git/hooks/commit-msg
chmod 755 .git/hooks/commit-msg
