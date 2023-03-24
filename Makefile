test_py:
	@pytest -p no:warnings api/src/tests.py
	
clean:
	@find . | grep -E '(__pycache__|\.pyc|\.pyo$|\.DS_Store)' | xargs rm -rf
