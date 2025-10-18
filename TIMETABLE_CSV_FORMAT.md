# Timetable CSV Format Guide

## Overview
The timetable feature now uses CSV format for easy editing in Excel, Google Sheets, or any spreadsheet application.

## CSV Structure

### Schedule Section (Top)
The CSV starts with a header row followed by time slot rows:

```csv
Time,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday
08:00 AM,Math,Chemistry,Math,Chemistry,Math,Games
09:00 AM,English,Math,English,Math,English,Math
10:00 AM,History,Geography,History,Geography,History,Geography
11:00 AM,Biology,History,Biology,History,Biology,History
12:00 PM,Physical Education,Art,Physical Education,Art,Physical Education,Lunch
01:00 PM,Lunch,Lunch,Lunch,Lunch,Lunch,Break
02:00 PM,Games,Break,Games,Break,Games,Art
03:00 PM,Break,Music,Break,Music,Break,
```

### Metadata Section (Bottom)
After an empty row, add metadata:

```csv

Academic Year,2024-2025
Semester,Fall
Class,Class 10
Section,A
```

## How to Use

### For Admins:

1. **Download Sample Template**
   - Click "Download Sample" button in the admin timetable page
   - A file named `timetable-sample.csv` will be downloaded
   - Open it in Excel or Google Sheets

2. **Edit the Timetable**
   - Modify the schedule as needed
   - Keep the header row (Time, Monday, Tuesday, etc.)
   - Update time slots and subjects
   - Modify metadata at the bottom
   - Leave cells empty for free periods

3. **Upload the Timetable**
   - Save your changes as CSV format
   - Click "Upload Timetable" button
   - Select your CSV file
   - The timetable will be uploaded and activated

### Tips:
- Keep the first row as headers: Time, Monday, Tuesday, etc.
- Time format should be consistent (e.g., "08:00 AM", "12:00 PM")
- Common subjects: Math, English, History, Biology, Chemistry, Geography, Art, Music, Games, Physical Education, Lunch, Break
- Leave cells empty for free periods
- Metadata rows help organize the timetable but are flexible

## API Endpoints

### Backend Routes:
- `GET /api/timetable/sample` - Download CSV sample template
- `POST /api/timetable/upload` - Upload CSV file (multipart/form-data)
- `GET /api/timetable/active` - Get active timetable (all roles)
- `GET /api/timetable/all` - Get all timetables (admin only)

### Frontend Pages:
- **Admin**: Upload and download CSV, view timetable
- **Faculty**: View-only access to active timetable
- **Student**: View-only access to active timetable

## Example CSV Content

```csv
Time,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday
08:00 AM,Math,Chemistry,Math,Chemistry,Math,Games
09:00 AM,English,Math,English,Math,English,Math
10:00 AM,History,Geography,History,Geography,History,Geography
11:00 AM,Biology,History,Biology,History,Biology,History
12:00 PM,Physical Education,Art,Physical Education,Art,Physical Education,Lunch
01:00 PM,Lunch,Lunch,Lunch,Lunch,Lunch,Break
02:00 PM,Games,Break,Games,Break,Games,Art
03:00 PM,Break,Music,Break,Music,Break,

Academic Year,2024-2025
Semester,Fall
Class,Class 10
Section,A
```

Save this as `timetable.csv` and upload it through the admin panel!
