import * as mockData from "../mockFiles/mockedJson.js";
// prepare entered command and submit button
window.onload = function () {
    prepareinput();
    prepareSubmitPress();
};
// default mode is brief
var current_mode = "Brief";
function prepareinput() {
    var input = document.getElementsByClassName("repl-command-box")[0];
    if (input == null) {
        console.log("Couldn't find input element");
    }
    else if (!(input instanceof HTMLInputElement)) {
        console.log("Found element ".concat(input, ", but it wasn't an input"));
    }
    else {
        input.addEventListener('keydown', function (e) {
            if (e.key == "Enter") {
                // strategy 1: reads the entered command after pressing "Enter"
                read();
            }
        });
    }
}
// strategy 2: deals with entered command after pressing Submit
function prepareSubmitPress() {
    var maybeInputs = document.getElementsByClassName("enter-command");
    var maybeInput = maybeInputs[0];
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLButtonElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.addEventListener("click", handleButtonClick);
    }
}
// input csv File
var file;
// reads after clicking the Submit button
function handleButtonClick(event) {
    read();
}
// deals with the input command
function read() {
    var newcommand = document.getElementsByClassName("repl-command-box")[0];
    if (newcommand == null) {
        console.log("Couldn't find input element");
    }
    else if (!(newcommand instanceof HTMLInputElement)) {
        console.log("Found element ".concat(newcommand, ", but it wasn't an input"));
    }
    else {
        handle_sentence(newcommand.value);
    }
}
var output = "";
function handle_sentence(cmd) {
    var repl_output = document.getElementsByClassName("output")[0];
    // User Story 1
    if (cmd == "mode") {
        if (current_mode == "Brief") {
            current_mode = "Verbose";
            output = "Mode switched to Verbose. ";
        }
        else if (current_mode == "Verbose") {
            current_mode = "Brief";
            output = "Mode switched to Brief. ";
        }
    } // User Story 2
    else if (cmd.substring(0, 9) == "load_file") {
        var filename = cmd.split(" ");
        if (filename.length != 2) {
            output = "Invalid number of inputs";
        }
        else {
            file = mockData.mockFilepaths.get(filename[1]);
            if (file == undefined) {
                output = "Filepath not found";
            }
            else {
                output = "CSV file loaded successfully";
            }
        }
    } // User Story 3
    else if (cmd == "view") {
        var output = "";
        var header = "";
        var rows = "";
        if (file == undefined) {
            output = "No CSV file stored yet.";
        }
        else {
            if (file.hasHeaders) {
                header += '<br><th>' + file.header + '</th></br>';
            }
            var r = 0;
            while (r < file.contents.length) {
                rows += '<br><tr><td>' + file.contents[r] + '</td></tr>' + '</br>';
                r++;
            }
            output += header + rows;
        }
    } // User Story 4
    else if (cmd.substring(0, 6) == "search") {
        var input = cmd.split(" ");
        var output = "";
        if (input.length != 3) {
            output = "Invalid number of inputs";
        }
        else {
            var column = input[1];
            var value = input[2];
            if (file == undefined) {
                output = "No CSV file stored yet.";
            }
            else {
                var r = 0;
                while (r < file.contents.length) {
                    output += '<br><tr><td>' + file.contents[r] + '</td></tr>' + '</br>';
                    r++;
                }
            }
        }
    }
    else {
        output = "Invalid Input";
    }
    // Output either Brief or Verbose
    if (current_mode == "Brief") {
        repl_output.innerHTML += '<p>' + output + '</p>';
    }
    else if (current_mode == "Verbose") {
        repl_output.innerHTML += '<p> Command: ' + cmd + '</p>';
        repl_output.innerHTML += '<p> Output: ' + output + '</p>';
    }
    else {
        repl_output.innerHTML += '<p> ERROR: Illegal Mode </p>';
    }
}
export { handleButtonClick, handle_sentence };
