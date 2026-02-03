document.addEventListener('DOMContentLoaded', () => {
    // Initial 3 rows
    for(let i=0; i<3; i++) addSubject();
    
    document.getElementById('add-subject').addEventListener('click', addSubject);
});

function addSubject() {
    const tbody = document.getElementById('subject-body');
    const tr = document.createElement('tr');
    tr.className = 'animate-fade-in';
    tr.innerHTML = `
        <td><input type="text" placeholder="Subject" class="s-name"></td>
        <td>
            <select class="s-type">
                <option value="theory">Theory/(100)</option>
                <option value="lab">Practical/(50)</option>
            </select>
        </td>
        <td><input type="number" placeholder="Marks" class="s-marks" min="0"></td>
        <td><input type="number" placeholder="Cr" class="s-credits" min="1" max="6"></td>
        <td><button class="btn-delete" onclick="this.parentElement.parentElement.remove()" style="background:none; color:#e74c3c;"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}

function getGradePoints(marks, type) {
    if (type === 'lab') {
        if (marks >= 47) return { gp: 4.00, lg: 'A+' };
        if (marks >= 45) return { gp: 3.88, lg: 'A' };
        if (marks >= 43.5) return { gp: 3.50, lg: 'A-' };
        if (marks >= 41.5) return { gp: 3.33, lg: 'B+' };
        if (marks >= 40) return { gp: 3.00, lg: 'B' };
        if (marks >= 37.5) return { gp: 2.88, lg: 'B-' };
        if (marks >= 35.5) return { gp: 2.67, lg: 'C+' };
        if (marks >= 34) return { gp: 2.50, lg: 'C' };
        if (marks >= 32) return { gp: 2.33, lg: 'C-' };
        if (marks >= 30.0) return { gp: 2.00, lg: 'D' };
        return { gp: 0.00, lg: 'F' };
    } else {
        if (marks >= 94) return { gp: 4.00, lg: 'A+' };
        if (marks >= 90) return { gp: 3.88, lg: 'A' };
        if (marks >= 87) return { gp: 3.50, lg: 'A-' };
        if (marks >= 83) return { gp: 3.33, lg: 'B+' };
        if (marks >= 80) return { gp: 3.00, lg: 'B' };
        if (marks >= 75) return { gp: 2.88, lg: 'B-' };
        if (marks >= 71) return { gp: 2.67, lg: 'C+' };
        if (marks >= 68) return { gp: 2.50, lg: 'C' };
        if (marks >= 64) return { gp: 2.33, lg: 'C-' };
        if (marks >= 61 ) return { gp: 2.00, lg: 'D' };
        if (marks >= 60 ) return { gp: 1.70, lg: 'D-' };
        return { gp: 0.00, lg: 'F' };
    }
}

function calculateResult() {
    const marks = document.querySelectorAll('.s-marks');
    const credits = document.querySelectorAll('.s-credits');
    const types = document.querySelectorAll('.s-type');
    const names = document.querySelectorAll('.s-name');
    
    let currentQualityPoints = 0;
    let currentTotalCredits = 0;
    let summaryHTML = '<strong>Subject Details:</strong>';

    marks.forEach((m, index) => {
        let val = parseFloat(m.value);
        let cr = parseFloat(credits[index].value);
        let type = types[index].value;
        let name = names[index].value || `Subject ${index + 1}`;

        if (!isNaN(val) && !isNaN(cr)) {
            let result = getGradePoints(val, type);
            currentQualityPoints += (result.gp * cr);
            currentTotalCredits += cr;
            summaryHTML += `<div class="summary-item"><span>${name} (${result.lg})</span> <span>GP: ${result.gp.toFixed(2)}</span></div>`;
        }
    });

    if (currentTotalCredits === 0) {
        alert("Please enter marks and credits!");
        return;
    }

    const sgpa = currentQualityPoints / currentTotalCredits;

    // CGPA Calculation
    let prevCr = parseFloat(document.getElementById('prev-credits').value) || 0;
    let prevCgpa = parseFloat(document.getElementById('prev-cgpa').value) || 0;
    
    let totalCredits = prevCr + currentTotalCredits;
    let totalQualityPoints = (prevCr * prevCgpa) + currentQualityPoints;
    let cgpa = totalQualityPoints / totalCredits;

    // Display Results
    document.getElementById('res-sgpa').innerText = sgpa.toFixed(2);
    document.getElementById('res-cgpa').innerText = cgpa.toFixed(2);
    document.getElementById('res-total-credits').innerText = totalCredits;
    document.getElementById('subject-summary').innerHTML = summaryHTML;
    document.getElementById('result-display').style.display = 'block';
    
    document.getElementById('result-display').scrollIntoView({ behavior: 'smooth' });
}

function clearAll() {
    if(confirm("Are you sure you want to clear all data?")) {
        window.location.reload();
    }
}

function downloadResult() {
    window.print();

}



