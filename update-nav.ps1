# PowerShell script to update navigation in all HTML files

$files = @(
    "about.html",
    "news.html",
    "get-involved.html",
    "faq.html",
    "roadmap.html",
    "contact.html",
    "events.html"
)

$searchPattern = @"
            </ul>
            <div class="nav-actions">
                <a href="login.html" class="nav-link login-btn">Sign Up</a>
                <a href="contact.html" class="nav-contact-btn">Contact Us</a>
            </div>
"@

$replacePattern = @"
                <li class="nav-item mobile-only"><a href="login.html" class="nav-link login-btn">Sign Up</a></li>
                <li class="nav-item mobile-only"><a href="contact.html" class="nav-contact-btn">Contact Us</a></li>
            </ul>
            <div class="nav-actions">
                <a href="login.html" class="nav-link login-btn">Sign Up</a>
                <a href="contact.html" class="nav-contact-btn">Contact Us</a>
            </div>
"@

foreach ($file in $files) {
    $filePath = "c:\Users\Dell\Desktop\dev\united nation website\$file"
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $newContent = $content -replace [regex]::Escape($searchPattern), $replacePattern
        Set-Content -Path $filePath -Value $newContent -NoNewline
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Navigation update complete!"
