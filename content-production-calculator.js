// Call Tooltips 
//  $(function () {
//      $(document).tooltip();
//  });

  var ContentProductionModel = function () {
      var self = this;
      self.woo = "hoo";
      self.startDate = ko.observable("");
      self.endDate = ko.observable("");
      self.workingHoursPerDay = ko.observable(6);
      self.estimatedTargetPages = ko.observable("");
      self.estimatedHrsPerPage = ko.observable("");
      self.numberOfWriters = ko.observable("");

      self.daysBetween = ko.computed(function () {
          if (self.startDate() && self.endDate()) {
              // alert( self.startDate()  );
              var startDate = moment(self.startDate());
              var endDate = moment(self.endDate());
              var daysDiff = endDate.diff(startDate, 'days') + 1;
              return daysDiff;
          } else {
              return "0";
          }
      });

      self.workingHoursInPeriod = ko.computed(function () {
          if (self.daysBetween() && self.workingHoursPerDay()) {
              var daysBetween = self.daysBetween();
              var workingHoursPerDay = self.workingHoursPerDay();
              var workingHoursInPeriod = (daysBetween * workingHoursPerDay);
              return workingHoursInPeriod;
          } else {
              return "0";
          }
      });


      //    self.estimatedNumPages = ko.computed(function(){
      //        var estimatedHrsPerPage = self.estimatedHrsPerPage();
      //        var numberOfWriters = self.numberOfWriters();
      //        var workingHoursPerDay = self.workingHoursPerDay();
      //        var daysBetween = self.daysBetween();        
      //        if ( estimatedHrsPerPage && numberOfWriters && workingHoursPerDay && ( daysBetween != "XX" ) ){
      //            return (daysBetween*workingHoursPerDay*numberOfWriters)/estimatedHrsPerPage;
      //        } else {
      //            return "XX";
      //        }
      //    });


      // Calculate how much effort (in hours) it will take to produce the target pages they want

      self.estimatedTotalHours = ko.computed(function () {
          var estimatedHrsPerPage = self.estimatedHrsPerPage();
          var estimatedTargetPages = self.estimatedTargetPages();
          if (estimatedHrsPerPage && estimatedTargetPages) {
              return (estimatedHrsPerPage * estimatedTargetPages);
          } else {
              return "0";
          }
      });

// Calculate how much effort (in days) it will take to produce the target pages they want - round this to present back

      self.estimatedTotalDays = ko.computed(function () {
          var estimatedTotalHours = self.estimatedTotalHours();
          var workingHoursPerDay = self.workingHoursPerDay();
          if (estimatedTotalHours() && workingHoursPerDay()) {
              //   return (estimatedTotalHours / workingHoursPerDay);
              var estimatedTotalDays = (estimatedTotalHours / workingHoursPerDay);
              var estimatedTotalDaysRounded = Math.round(estimatedTotalHours * 10) / 10;
              return estimatedTotalDaysRounded;
              alert (estimatedTotalDaysRounded);
          } else {
              return "0";
          }
      });

      
// Calculate how many writers are required to produce the required number of pages during the defined production period
      
      self.reqdWriters = ko.computed(function () {
          if (self.estimatedTotalHours() && self.workingHours()) {
              var estimatedTotalHours = self.estimatedTotalHours();
              var workingHours = self.workingHours();
              var reqdWritersTotal = (estimatedTotalHours / workingHours);
              var reqdWritersRounded = Math.round(reqdWritersTotal * 10) / 10;
              return reqdWritersRounded;
          } else {
              return "0";
          }
      });





      self.debug = function () {
          alert('hi');

      };

  };

  var myViewModel = new ContentProductionModel();
  ko.applyBindings(myViewModel);