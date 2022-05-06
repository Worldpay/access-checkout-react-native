#!/bin/bash

# pre-commit hook
echo "#!/bin/bash
./scripts/githooks/pre-commit" > .git/hooks/pre-commit
chmod 755 .git/hooks/pre-commit
