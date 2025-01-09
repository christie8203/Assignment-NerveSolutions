let dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024']
let strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread',],
            '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
            '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
]
let tabName = 'Bullish';
let stratRender;
let selectedDate = null;
const strategyBodyDateContainer = document.querySelector('#datesDropdown');
const selectedDateElement = document.querySelector('#strategyDates_SelectedDate');
let strategyBodyContainer = document.querySelector('.strategies');
const dropdownArrow = document.querySelector('.dropdownArrow');
const dropdown = document.getElementById('datesDropdown');

//deslect all the tabs highlight
function deslectAllTabs() {
    try {
        document.querySelectorAll('.tabChild').forEach((tab) => {
            tab.classList.remove('tabHighlight');
        })
    } catch (error) {
        console.log("error in deslectAllTabs")
    }
}

function renderStrategiesDates() {
    let showAllStrategiesDates = '';
    dateArray.forEach(date => {
        const formattedDate = formatDate(date); // Convert to "24 Apr 2024"
        showAllStrategiesDates += `
      <div class="strategyDates_Date" onclick="selectDate('${formattedDate}')">
        <span>${formattedDate}</span>
      </div>
    `;
    });
    strategyBodyDateContainer.innerHTML = showAllStrategiesDates;
}

function toggleDropdown() {
    const dropdown = document.getElementById('datesDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function selectDate(date) {
    selectedDateElement.textContent = date;

    toggleDropdown();
    if (tabName == 'Bullish') {
        countOccurrences(date, 'Bullish');
    }
    else if (tabName == 'Bearish') {
        countOccurrences(date, 'Bearish');
    }
    else if (tabName == 'RangeBound') {
        countOccurrences(date, 'RangeBound');
    }
    else if (tabName == 'Volatile') {
        countOccurrences(date, 'Volatile');
    }
    dropdownArrow.classList.remove('open');
}

function formatDate(date) {
    const [day, month, year] = date.split('-');
    return `${day} ${month} ${year}`;
}
function antiFormatDate(formattedDate) {
    const [day, month, year] = formattedDate.split(' ');
    return `${day}-${month}-${year}`;
}

renderStrategiesDates();


function tabSelection(event) {
    try {
        let selectedDate = selectedDateElement.textContent;
        const target = event.target;
        if (target.classList.contains('Bullish')) {
            console.log('Bullish');
            deslectAllTabs()
            document.querySelector('.Bullish').classList.add('tabHighlight')
            tabName = 'Bullish'
            countOccurrences(selectedDate, 'Bullish');

        }
        else if (target.classList.contains('Bearish')) {
            console.log('Bearish');
            deslectAllTabs()
            document.querySelector('.Bearish').classList.add('tabHighlight')
            tabName = 'Bearish'
            countOccurrences(selectedDate, 'Bearish');

        }
        else if (target.classList.contains('RangeBound')) {
            console.log('RangeBound');
            deslectAllTabs()
            document.querySelector('.RangeBound').classList.add('tabHighlight')
            tabName = 'RangeBound'
            countOccurrences(selectedDate, 'RangeBound');

        }
        else if (target.classList.contains('Volatile')) {
            console.log('Volatile');
            deslectAllTabs()
            document.querySelector('.Volatile').classList.add('tabHighlight')
            tabName = 'Volatile'
            countOccurrences(selectedDate, 'Volatile');

        }

    } catch (error) {
        console.log(`error in tabSelection ${error}`)
    }
}

document.querySelector('.tab').addEventListener('click', tabSelection)

function countOccurrences(date, view) {
    const strategy = strategyArray.find(item => item.View === view);

    if (!strategy) {
        console.log(`View "${view}" not found.`);
        stratRender = "noStartegy";
        renderStrategies()
        return `View "${view}" not found.`;
    }


    let antiDate = antiFormatDate(date);

    const strategiesForDate = strategy.Value[antiDate];

    if (!strategiesForDate) {
        stratRender = "noStartegy";
        renderStrategies()
        return `No strategies found for the date "${date}".`;
    }

    const occurrenceCount = strategiesForDate.reduce((acc, strategy) => {
        acc[strategy] = (acc[strategy] || 0) + 1;
        return acc;
    }, {});

    stratRender = occurrenceCount;
    renderStrategies()
    return occurrenceCount;
}




function renderStrategies() {
    let showAllStrategies = '';
    if (stratRender == 'noStartegy') {
        showAllStrategies += `
        <div class="noStrategies">
          <div>There are no strategies for</div>
          <div class="noStrategiesDate">${selectedDateElement.textContent}</div>
        </div>
      `;
    }
    else {
        for (const [key, value] of Object.entries(stratRender)) {
            if (value > 1) {
                showAllStrategies += `
          <div class="strategiesName">
            <span>${key}</span>
            <span style = "color:rgb(178, 177, 186)"><span class="strategyDot"></span>${value} Strategies</span>
          </div>
        `;
            }
            else {
                showAllStrategies += `
  <div class="strategiesName">
    <span>${key}</span>
    <span"><span class="strategyDot"></span>${value} Strategy</span>
  </div>
`;
            }


        }
    }

    strategyBodyContainer.innerHTML = showAllStrategies;
}


document.querySelector('.Bullish').click();


document.querySelector('.strategyDates_SelectedContainer').addEventListener('click', () => {
    dropdown.classList.toggle('open');
    dropdownArrow.classList.toggle('open');
});

