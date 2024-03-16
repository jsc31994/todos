const userTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

document.getElementById('timezone').textContent = userTime;
