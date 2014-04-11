package org.eoc.di.auto.beans;

public class Bean {
	private String name;

	public Bean(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("SetterBean [");
		if (name != null) {
			builder.append("name=").append(name);
		}
		builder.append("]");
		return builder.toString();
	}
}
