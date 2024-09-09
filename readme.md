# Document Generator API

## Overview

The **Document Generator API** is a RESTful service built with **Node.js** that dynamically generates `.docx` documents from templates by replacing placeholders with provided data, including tables with incremented row numbers. The API supports both Hijri and Gregorian date formats, and it can return a downloadable `.docx` file.

## Features

- Replace dynamic placeholders in `.docx` templates.
- Automatically increment table rows.
- Hijri and Gregorian date support.
- Serve generated documents for download.
- Unit tested with **Jest**.

## Installation

To install and set up this project locally, follow the instructions below:

### 1. Clone the repository

```bash
git clone https://github.com/devnolife/document-generator-api.git
cd document-generator-api
```

### 2. Install the required dependencies

Use the following **npm** commands to install the dependencies for this project:

#### Install the main dependencies

```bash
npm install express pizzip xml2js moment moment-hijri
```

#### Install development dependencies (for testing)

```bash
npm install --save-dev jest supertest
```

### 3. Project Setup

Make sure you have the following files in your root directory:

- **template.docx**: The `.docx` template file that contains placeholders like `{no}`, `{nama}`, `{tanggal_masehi}`, `{nim}`, and `{nama_mahasiswa}`.
- **images.jpg**: An example image to insert into the document.

### 4. Start the Server

To run the server, use the following command:

```bash
npm start
```

### 5. Run Tests

To run the unit tests for the application, use:

```bash
npm test
```

---

## API Endpoints

### 1. Generate Document

- **Endpoint**: `POST /api/generate-report`
- **Description**: Generates a `.docx` report by replacing placeholders in the template and filling in tables dynamically.

- **Request Body**:

```json
{
  "no": "001",
  "nama": "John Doe",
  "table_data": [
    { "nim": "1058401107321", "nama_mahasiswa": "Chalidah Az-zahrah. H" },
    { "nim": "1058401107021", "nama_mahasiswa": "FATURROHMAN AL-KHAIR" },
    { "nim": "1058401106821", "nama_mahasiswa": "RIAN HIDAYAT" }
  ]
}
```

- **Response**:

```json
{
  "message": "Report generated successfully",
  "downloadLink": "/download/report_1234567890.docx"
}
```

The response will include a `downloadLink` to download the generated document.

### 2. Download Document

- **Endpoint**: `GET /download/:filename`
- **Description**: Downloads the generated `.docx` report from the `generated_reports` directory.

Example:

```bash
GET /download/report_1234567890.docx
```

---

## Conclusion

The **Document Generator API** allows you to dynamically create `.docx` reports using a predefined template. It supports dynamic data input for tables, placeholder replacement, and multiple date formats (Hijri and Gregorian). The generated documents can be downloaded through the API.

---
