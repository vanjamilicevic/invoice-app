import "../css/calendar.css"
import { getStringDate, extractMonthAndYear, isFromThisMonth, isLeapYear, daysInMonth, numberToMonthName } from "../utils/date"
import { useState } from "react"

const daysToShow = (monthYear) => {

  let [month, year] = monthYear.split(" ")
  if (month === "Feb" && !isLeapYear(Number(year)))
    return 28
  else 
    return 35
}

const Calendar = (props) => {

  const [calendarIsVisible, setCalendarVisibility] = useState(false)
  const [dateOutput, setDateOutput] = useState(props.date && props.date !== "" ? props.date : getStringDate())
  const [calendarCurrentMonth, setCalendarCurrentMonth] = useState(extractMonthAndYear(dateOutput))

  const updateDateOutput = (event) => {
    
    let newOutput = event.target.innerHTML + " " + calendarCurrentMonth;
    // If we clicked on a day that bengs to the next month
    if (event.target.getAttribute("class").includes("next-month")) {
      let newDate = new Date(newOutput)
      newDate.setMonth(newDate.getMonth() + 1)
      newOutput = getStringDate(newDate.getDate(), newDate.getMonth() + 1 < 10 ? "0" + String(newDate.getMonth() + 1) : String(newDate.getMonth() + 1), newDate.getFullYear())
    }
    
    setDateOutput(newOutput)
    setCalendarCurrentMonth(extractMonthAndYear(newOutput))
    toggleCalendarVisibility()
  }

  const changeToPreviousMonth = () => {

    let [month, year] = calendarCurrentMonth.split(" ")
    let currentCalendar = new Date(`${month} ${year}`)
    currentCalendar.setMonth(currentCalendar.getMonth() - 1)
    
    setCalendarCurrentMonth(`${numberToMonthName(currentCalendar.getMonth() + 1)} ${currentCalendar.getFullYear()}`)
  }

  const changeToNextMonth = () => {

    let [month, year] = calendarCurrentMonth.split(" ")
    let currentCalendar = new Date(`${month} ${year}`)
    currentCalendar.setMonth(currentCalendar.getMonth() + 1)
    
    setCalendarCurrentMonth(`${numberToMonthName(currentCalendar.getMonth() + 1)} ${currentCalendar.getFullYear()}`)
  }

  const toggleCalendarVisibility = () => setCalendarVisibility(!calendarIsVisible)
  return (
    <section className={`calendar-container ${props.theme === "dark-theme" ? "calendar-container-dark-theme" : ""}`}>
      <div className={`calendar-input-container ${props.theme === "dark-theme" ? "calendar-input-container-dark-theme" : ""}`} onClick={toggleCalendarVisibility}>
        <p id="invoice-date-input" className={`calendar-input-container-text ${props.theme === "dark-theme" ? "calendar-input-container-text-dark-theme" : ""}`}>
          { 
            dateOutput
          }
        </p>
        <i className="calendar-input-icon far fa-calendar"></i>
      </div>
      {
        calendarIsVisible ?
        <div className={`calendar ${props.theme === "dark-theme" ? "calendar-dark-theme" : ""}`} >
          <div className="calendar-header">
            <i className="fas fa-chevron-left" onClick={changeToPreviousMonth}></i>
            <p className={`calendar-title ${props.theme === "dark-theme" ? "calendar-title-dark-theme" : ""}`}>
              { calendarCurrentMonth }
            </p>
            <i className="fas fa-chevron-right" onClick={changeToNextMonth}></i>
          </div>
          <div className="calendar-content">
            {
              [...Array(daysToShow(calendarCurrentMonth))].map((x, i) => {

                return (
                  <p className={`day ${!isFromThisMonth(i + 1, calendarCurrentMonth) ? 'next-month' : ''} ${props.theme === "dark-theme" ? "day-dark-theme" : ""}`} key={i + 1} onClick={updateDateOutput}>
                    {
                      isFromThisMonth(i + 1, calendarCurrentMonth) ?
                        i + 1 :
                        daysToShow(calendarCurrentMonth) - daysInMonth(calendarCurrentMonth) - daysToShow(calendarCurrentMonth) % (i + 1)
                    }
                  </p>
                )
              })
            }
          </div>
        </div>
        : null
      }
    </section>
  )
}

export default Calendar