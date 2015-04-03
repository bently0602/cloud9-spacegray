var fs = require('fs');

if(!process.argv[2]) {
    console.log('cloud9-spacegray install requires path to cloud9 core as first parameter');
    console.log('ex. "/software/core"');
    process.exit(1);
}

var core_path = process.argv[2];
var themes_filepath = core_path + '/plugins/c9.ide.ace/themes.json';

fs.exists(themes_filepath, function(exists) { 
    if (exists) { 
        var themes = require(themes_filepath);
        themes["Spacegray"] = "ace/theme/spacegray";
        
        try {
            if (fs.existsSync(core_path + '/node_modules/ace/lib/ace/theme/spacegray.js')) {
                fs.unlinkSync(core_path + '/node_modules/ace/lib/ace/theme/spacegray.js');
            }
            fs.createReadStream('./spacegray/spacegray.js')
                .pipe(fs.createWriteStream(
                    core_path + '/node_modules/ace/lib/ace/theme/spacegray.js'
                )
            );
            if (fs.existsSync(core_path + '/node_modules/ace/lib/ace/theme/spacegray.css')) {
                fs.unlinkSync(core_path + '/node_modules/ace/lib/ace/theme/spacegray.css');
            }
            fs.createReadStream('./spacegray/spacegray.css')
                .pipe(fs.createWriteStream(
                    core_path + '/node_modules/ace/lib/ace/theme/spacegray.css'
                )
            );
        } catch (ex) {
            console.log('cloud9-spacegray install error');
            console.log('exception ' + ex.toString());
            process.exit(1);
        }
        fs.writeFile(
            themes_filepath,
            JSON.stringify(themes, null, 4), 
            function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Theme saved to " + core_path);
                    console.log("Go to your 'Preferences', change the editor theme, then reload the page to see the change.");
                }
            }
        );    
    } else {
        console.log('cloud9-spacegray install requires path to cloud9 core as first parameter');
        console.log('passed path does not contain a themes.json file');
        console.log('ex. "/software/core"');
        console.log('looking for...');
        console.log(themes_filepath);
        process.exit(1);
    }
});