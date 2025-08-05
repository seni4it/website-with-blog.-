#!/usr/bin/env node

import fs from 'fs';

console.log('🧹 Cleaning up after production build...');

// Restore original App.tsx from backup
const appPath = 'src/App.tsx';
const backupPath = 'src/App.dev.tsx';

if (fs.existsSync(backupPath)) {
  const originalContent = fs.readFileSync(backupPath, 'utf8');
  fs.writeFileSync(appPath, originalContent);
  fs.unlinkSync(backupPath);
  console.log('✅ Original App.tsx restored');
  console.log('🗑️  Backup file cleaned up');
} else {
  console.log('⚠️  No backup found, leaving current App.tsx as-is');
}

console.log('🎉 Production build ready! The dist/ folder contains your public website.');
console.log('🔒 Admin panel is excluded from production for security.');
console.log('📁 Deploy the contents of the dist/ folder to your hosting service.');