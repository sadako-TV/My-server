# ===== Git Repo Cleanup Script =====
Write-Host "🚀 Git Repo 정리 시작..."

# 1. 혹시 진행 중인 rebase/merge 중단
git rebase --abort 2>$null
git merge --abort 2>$null

# 2. 문제되는 폴더 삭제
Write-Host "🗑 My-server & node_modules 삭제..."
Remove-Item -Recurse -Force .\My-server -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\node_modules -ErrorAction SilentlyContinue

# 3. .gitignore에 node_modules 추가
Write-Host "📝 .gitignore 업데이트..."
if (-not (Select-String -Path ".gitignore" -Pattern "node_modules/" -Quiet)) {
    Add-Content .gitignore "node_modules/"
}

# 4. Git 커밋 & 강제 푸시
Write-Host "📦 변경 사항 커밋 중..."
git add .
git commit -m "Clean repo: remove My-server submodule & node_modules" || Write-Host "⚠️ 커밋할 변경 없음"

Write-Host "⬆️ 원격 저장소에 강제 푸시..."
git push origin main --force

Write-Host "✅ Git Repo 정리 완료!"
