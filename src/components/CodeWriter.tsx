
import React, { useState, useEffect } from 'react';

const CodeWriter: React.FC = () => {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const vbaExamples = [
    {
      title: "Unhide All Worksheets",
      code: `Sub UnhideAllWorksheets()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        ws.Visible = xlSheetVisible
    Next ws
    MsgBox "All worksheets unhidden!"
End Sub`
    },
    {
      title: "Smart Data Cleanup",
      code: `Sub SmartDataCleanup()
    Dim rng As Range
    Set rng = Selection
    With rng
        .Replace What:="  ", Replacement:=" "
        .Replace What:=" ", Replacement:=""
    End With
    MsgBox "Data cleaned successfully!"
End Sub`
    },
    {
      title: "Auto-Generate Chart",
      code: `Sub AutoGenerateChart()
    Dim chartObj As ChartObject
    Set chartObj = ActiveSheet.ChartObjects.Add(100, 100, 400, 300)
    With chartObj.Chart
        .SetSourceData Range("A1:B10")
        .ChartType = xlColumnClustered
    End With
End Sub`
    },
    {
      title: "Email Report Automatically",
      code: `Sub EmailReport()
    Dim OutApp As Object
    Dim OutMail As Object
    Set OutApp = CreateObject("Outlook.Application")
    Set OutMail = OutApp.CreateItem(0)
    With OutMail
        .To = "manager@company.com"
        .Subject = "Daily Report"
        .Body = "Please find attached report"
        .Send
    End With
End Sub`
    },
    {
      title: "Delete Blank Rows",
      code: `Sub DeleteBlankRows()
    Dim i As Long
    For i = Cells(Rows.Count, 1).End(xlUp).Row To 1 Step -1
        If Application.CountA(Rows(i)) = 0 Then
            Rows(i).Delete
        End If
    Next i
    MsgBox "Blank rows deleted!"
End Sub`
    },
    {
      title: "Protect Worksheet",
      code: `Sub ProtectWorksheet()
    Dim pwd As String
    pwd = "SecurePassword123"
    ActiveSheet.Protect Password:=pwd, _
        DrawingObjects:=True, _
        Contents:=True, _
        Scenarios:=True
    MsgBox "Worksheet protected!"
End Sub`
    },
    {
      title: "Color Every Alternate Row",
      code: `Sub ColorAlternateRows()
    Dim rng As Range
    Dim i As Long
    Set rng = Selection
    For i = 1 To rng.Rows.Count
        If i Mod 2 = 0 Then
            rng.Rows(i).Interior.Color = RGB(240, 248, 255)
        End If
    Next i
End Sub`
    },
    {
      title: "Find & Replace Text",
      code: `Sub FindAndReplace()
    Dim findText As String
    Dim replaceText As String
    findText = InputBox("Enter text to find:")
    replaceText = InputBox("Enter replacement text:")
    Cells.Replace What:=findText, _
        Replacement:=replaceText, _
        LookAt:=xlPart
    MsgBox "Find and replace completed!"
End Sub`
    },
    {
      title: "Export PDF",
      code: `Sub ExportToPDF()
    Dim fileName As String
    fileName = ThisWorkbook.Path & "\Report_" & _
        Format(Date, "yyyy-mm-dd") & ".pdf"
    ActiveSheet.ExportAsFixedFormat _
        Type:=xlTypePDF, _
        fileName:=fileName, _
        Quality:=xlQualityStandard
    MsgBox "PDF exported successfully!"
End Sub`
    },
    {
      title: "Add Hyperlinks to Cells",
      code: `Sub AddHyperlinks()
    Dim cell As Range
    For Each cell In Selection
        If cell.Value <> "" Then
            cell.Hyperlinks.Add Anchor:=cell, _
                Address:="https://www." & cell.Value & ".com", _
                TextToDisplay:=cell.Value
        End If
    Next cell
End Sub`
    }
  ];

  useEffect(() => {
    const typeCode = () => {
      setIsTyping(true);
      setDisplayedCode('');
      const currentCode = vbaExamples[currentCodeIndex].code;
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < currentCode.length) {
          setDisplayedCode(currentCode.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          // Auto-advance to next code after 3 seconds
          setTimeout(() => {
            setCurrentCodeIndex((prev) => (prev + 1) % vbaExamples.length);
          }, 3000);
        }
      }, 24); // 24ms per character for realistic typing speed

      return () => clearInterval(typeInterval);
    };

    const timeoutId = setTimeout(typeCode, 500);
    return () => clearTimeout(timeoutId);
  }, [currentCodeIndex]);

  const handleDotClick = (index: number) => {
    setCurrentCodeIndex(index);
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-2xl mx-auto animate-bounce-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-blue-100/50 text-blue-700 rounded-full text-xs font-medium">
            VBA
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isTyping ? 'bg-green-100/50 text-green-700' : 'bg-gray-100/50 text-gray-700'
          }`}>
            {isTyping ? 'Writing...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Code Title */}
      <h3 className="text-lg font-semibold text-blue-700 mb-4">
        {vbaExamples[currentCodeIndex].title}
      </h3>

      {/* Code Display */}
      <div className="bg-blue-900/10 rounded-lg p-4 min-h-[200px] font-mono text-sm">
        <pre className="code-line whitespace-pre-wrap">
          {displayedCode}
          {isTyping && <span className="typing-cursor"></span>}
        </pre>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {vbaExamples.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`progress-dot ${index === currentCodeIndex ? 'active' : ''}`}
            aria-label={`Go to code example ${index + 1}`}
          />
        ))}
      </div>

      {/* Code Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-blue-600">
          {currentCodeIndex + 1} of {vbaExamples.length} examples
        </span>
      </div>
    </div>
  );
};

export default CodeWriter;
