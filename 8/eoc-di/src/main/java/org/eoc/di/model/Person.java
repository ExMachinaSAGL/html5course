package org.eoc.di.model;

public class Person {
	private String name;
	private Integer age;

	public Person() {
	}

	public Person(String name, Integer age) {
		super();
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Person [");
		if (name != null) {
			builder.append("name=").append(name).append(", ");
		}
		if (age != null) {
			builder.append("age=").append(age);
		}
		builder.append("]");
		return builder.toString();
	}

}
