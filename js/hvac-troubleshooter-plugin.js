  (function( $ ) {
	'use strict';
	
  function next_step(page, container){
  
  var decider=container.find('.decider:visible:checked').val();
  //console.log(decider);

  decider=decider.split('-');
  decider=decider[1];
  var newpage=decider;
  //console.log('next to '+newpage);

	container.find('.ci-inner-wrapper').hide('fast',function(){
	});
container.find('.inner-wrapper-'+newpage ).fadeIn('fast',function(){
		
			if(newpage==100|| newpage==5){
				container.find('.inner-wrapper-'+newpage +' .back-step').attr('id','back-'+page);
			//	console.log('back btn changed to '+page);
			} 
			
			
			
		});
  
  }
  
  jQuery(document).ready(function($){
	
	jQuery.extend(jQuery.validator.messages, {
    required: "Please select an option"
	});
	
	
	$('.hvac-troubleshooter-form').validate({
		errorPlacement: function (error, element) {
		
		 if (element.attr('type') === 'radio') {
				error.insertBefore(element);
			}
		},
		messages:{
			radio:{
				required: "Please select an option"
			}
			
		}
		
	});
		
		$('.nxt-step').click(function(){
			
			var container= $(this).closest('.ci-hvac-container');
			var idd=$(this).attr('id');
			idd=idd.split('-');
			idd=idd[2];
				
			if($('.hvac-troubleshooter-form').valid())
			{
				
				next_step(idd, container);
				
			}
		
		});
		
		
		$('.back-step').click(function(){
			
			var container= $(this).closest('.ci-hvac-container');
			
			var backidd=$(this).attr('id');
			backidd=backidd.split('-');
			backidd=backidd[1];
			//console.log('back to '+ backidd	);
			container.find('.ci-inner-wrapper').hide('fast',function(){
			});
container.find('.inner-wrapper-'+backidd ).fadeIn('fast',function(){
					
				});
			
			
			
		});
  });
  
  

})( jQuery );  