$('#mybutton').on('click',function(){

	
	
	var $new=$('#new');
	var $temp=$('#movie-temp').html();
	var $title=$('#searchInput');
	var titl=$title.val();
	var $poster=$('#poster');
	var $details=$('#details');
	
  $("#poster").empty();
  $("#details").empty();
	console.log(titl);
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+titl,
		success:function(item){
			
			$.each(item,function(i,movie){
				
				$.each(movie,function(k,flim){
					$new.append(Mustache.render($temp,flim));
				});
				
			});

		}
	});
});