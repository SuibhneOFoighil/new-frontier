#!/bin/bash

echo "🧪 Testing Husky Git Hooks"
echo "=========================="

# Test pre-commit hook
echo ""
echo "🔍 Testing pre-commit hook..."
./.husky/pre-commit
if [ $? -eq 0 ]; then
    echo "✅ Pre-commit hook passed!"
else
    echo "❌ Pre-commit hook failed!"
    exit 1
fi

# Test commit message validation
echo ""
echo "📝 Testing commit message validation..."
echo "feat: test commit message" > /tmp/test-commit-msg
./.husky/commit-msg /tmp/test-commit-msg
if [ $? -eq 0 ]; then
    echo "✅ Commit message validation passed!"
else
    echo "❌ Commit message validation failed!"
    exit 1
fi

# Test pre-push hook
echo ""
echo "🚀 Testing pre-push hook..."
./.husky/pre-push
if [ $? -eq 0 ]; then
    echo "✅ Pre-push hook passed!"
else
    echo "❌ Pre-push hook failed!"
    exit 1
fi

echo ""
echo "🎉 All hooks are working correctly!"
echo ""
echo "📋 Usage:"
echo "  • Hooks will run automatically on git commit and git push"
echo "  • Use conventional commit format: type(scope): description"
echo "  • Run 'npm run lint' to check code style manually"
echo "  • Run 'npm run build' to test build manually" 