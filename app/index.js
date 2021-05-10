// An ISO 8601-compliant watch face with a retro terminal-like theme.

import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const label_time = document.getElementById("label_time");
const label_date = document.getElementById("label_date")

clock.granularity = "minutes";

clock.ontick = (evt) => {
  let today = evt.date;
  
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day_name = days[today.getDay()];
  
  // get date for iso 8601 date style (yyyy-mm-dd)
  let year = today.getFullYear();
  let month = util.zeroPad(today.getMonth() + 1);
  let day = util.zeroPad(today.getDate());
  
  // what's the time, mr.wolf?
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  
  // use the user's prefered time format (12h, else 24h)
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = util.zeroPad(hours);
  }
  
  label_time.text = `${hours}:${mins}`;
  label_date.text = `${day_name} ${year}-${month}-${day}`
}
