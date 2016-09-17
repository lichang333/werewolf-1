/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var index = (function(){
    function init(){
        initMenu();
        bindEvent();
        loadPage("introduce");
    }


    function initMenu(){
        $("#footer div[class^='col-']").on("click", function(e){
            var $menuDiv = $(e.target);
            var $btn = $(e.currentTarget).find("button");
            var pageName = $btn.get(0).name;
            if(!pageName){
                return;
            }

            loadPage(pageName);
        });

    }

    function loadPage(htmlName, target){
        target = target || "main";

        // load page
        var pageName = "html/" + htmlName + ".html";
        $("#" + target).load(pageName, function(){
            // add css to button group
            $("#footer button").removeClass("active");
            $("#footer button[name='" + htmlName + "']").addClass("active");

            // run page js
            window[htmlName].init.call();
        });
    }

    function bindEvent(){
    }


    return {
        init:init
    }
    
})();

index.init();