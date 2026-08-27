document.addEventListener('DOMContentLoaded', () => {
    function updateTime() {
        const now = new Date();

        // 12-hour time WITHOUT leading zero
        const d12h = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(/ [AP]M$/, '');

        // 12-hour time WITH leading zero
        const h412 = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(/ [AP]M$/, '');

        // 12-hour time WITHOUT leading zero WITH am/pm
        const d12hd = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        // Formatted Dates
        const formattedDate = now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }).replace(',', '');

        // Update d12h elements
        document.querySelectorAll('.time-display-d12h').forEach(element => {
            element.textContent = d12h;
        });

        // Update 412h elements
        document.querySelectorAll('.time-display-412h').forEach(element => {
            element.textContent = h412;
        });

        // Update d12hd elements
        document.querySelectorAll('.time-display-d12hd').forEach(element => {
            element.textContent = d12hd;
        });

        document.querySelectorAll('.formatted-date-display').forEach(element => {
            element.textContent = formattedDate;
        });
    }

    // Set immediately
    updateTime();

    // Keep it updated
    setInterval(updateTime, 1000);
});