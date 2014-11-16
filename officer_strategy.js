var max_time = 100;

var strategy_data;

function generateSampleStrategy()	{
	var sample_strategy = [];
	var len = strategy_data['strategies'].length;
	var rand = Math.floor(Math.random() * len);
	officer_strategy_num = rand;
	sample_strategy = strategy_data['strategies'][rand];
	return sample_strategy;
}