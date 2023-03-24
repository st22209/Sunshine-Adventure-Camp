test_py:
	@pytest -p no:warnings api/src/tests.py
	
clean:
	@find . | grep -E '(__pycache__|\.pyc|\.pyo$|\.DS_Store|.pytest_cache)' | xargs rm -rf

format:
	@black ./

lint:
	@flake8 ./

run_api:
	@python3 api/src/main.py